import { MercadoPagoConfig, Preference } from 'mercadopago';
import fetch from 'node-fetch';
import connection from '../database/db.js';


// Configuración del cliente de Mercado Pago
const client = new MercadoPagoConfig({
    accessToken: MERCADOPAGO_ACCESS_TOKEN,
    options: { timeout: 5000 }
});

const preference = new Preference(client);

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 segundos

// Función para manejar reintentos al consultar un pago
async function fetchWithRetries(url, options, retries = MAX_RETRIES) {
    for (let i = 0; i < retries; i++) {
        const response = await fetch(url, options);
        if (response.ok) return response.json();
        console.warn(`Reintento ${i + 1}/${retries} fallido. Esperando...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
    throw new Error('Error al consultar el pago: Not Found después de varios intentos');
}

// Crear una orden de pago
export const createOrder = async (req, res) => {
    const { items, payer, back_urls, metadata } = req.body;

    const body = {
        items,
        payer,
        back_urls: back_urls || {
            success: 'http://localhost:3000/success',
            failure: 'http://localhost:3000/failure',
            pending: 'http://localhost:3000/pending'
        },
        auto_return: 'approved',
        notification_url: 'https://185e-190-48-100-127.ngrok-free.app/webhook',// agregar nueva url ngrock
        metadata: metadata || {}
    };

    try {
        const response = await preference.create({ body });
        console.log('Preferencia creada:', response.id);
        res.status(200).json({ preferenceId: response.id });
    } catch (error) {
        console.error('Error al crear la preferencia:', error);
        res.status(500).send('Error al crear la preferencia de pago');
    }
};

// Webhook para procesar notificaciones
export const handleWebhook = async (req, res) => {
    try {      
        const { topic, resource } = req.body;
        let { id } = req.body;

        if (!id && resource) id = resource;

        if (!id) {
            console.error('ID de pago no encontrado en la notificación');
            return res.status(400).send('ID de pago no encontrado.');
        }

        if (topic === 'payment') {
            console.log(`Procesando el pago con ID: ${id}`);

            const url = `https://api.mercadopago.com/v1/payments/${id}`;
            const payment = await fetchWithRetries(url, {
                headers: {
                    Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
                }
            });

            console.log('Detalles del pago:', payment);

            if (payment.status === 'approved') {
                const { user_id, routine_ids } = payment.metadata || {};

                if (user_id && routine_ids) {
                    const queries = routine_ids.map(routineId =>
                        connection.query('INSERT INTO user_routines (routine_id, user_id) VALUES (?, ?)', [routineId, user_id])
                    );
                    await Promise.all(queries);
                    console.log(`Compra registrada: User ID ${user_id}, Routine IDs ${routine_ids}`);
                } else {
                    console.error('Faltan datos en metadata:', payment.metadata);
                }
            }
        }

        res.status(200).send('Webhook procesado correctamente.');
    } catch (error) {
        console.error('Error procesando el webhook:', error);
        res.status(500).send('Error procesando la notificación.');
    }
};

// Manejo de redirecciones
export const handleSuccess = (req, res) => {
    const { payment_id, status, merchant_order_id } = req.query;
    console.log('Pago exitoso:', { payment_id, status, merchant_order_id });
    res.redirect(`http://localhost:4000/welcome?message=success&payment_id=${payment_id}&status=${status}&clear_cart=true`);
};

export const handleFailure = (req, res) => {
  res.redirect('http://localhost:4000/carrito');
};

export const handlePending = (req, res) => {
  res.redirect('http://localhost:4000/carrito');
};
