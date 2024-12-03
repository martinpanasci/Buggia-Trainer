import { MercadoPagoConfig, Payment } from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();

// Configura MercadoPago usando el Access Token de producción
const client = new MercadoPagoConfig({
    accessToken: 'APP_USR-6576478160850175-102403-bc01ef70bbba96ddc0727ec1148e72d2-2053817961',  // Access Token de Producción
    options: { timeout: 5000 }
});

const payment = new Payment(client);

export const checkout = async (req, res) => {
    const items = req.body;  // Los productos del carrito vienen en req.body
    const payerEmail = items[0].payer.email;  // Obtenemos el email del primer producto como ejemplo

    try {
        const body = {
            transaction_amount: items.reduce((total, item) => total + item.transaction_amount, 0),  // Sumar el total del carrito
            description: 'Compra de productos',  // Descripción general de la compra
            payment_method_id: items[0].payment_method_id,  // Usamos el método de pago del primer producto
            payer: {
                email: payerEmail  // Email del pagador
            },            
        };

        console.log('Datos enviados a MercadoPago:', body);  // Verifica los datos antes de enviarlos a MercadoPago

        const paymentResponse = await payment.create({ body });
        res.status(200).json(paymentResponse);
    } catch (error) {
        console.error('Error procesando el pago:', error);
        res.status(500).json({ message: 'Error procesando el pago' });
    }
};