import { Request, Response } from "express";
import obj from "../config/obj";
import UserService from "../service/userService";
import stripe from "../config/stripe";


class PaymentController {
    async payForPremium(req: Request, res: Response): Promise<void> {
        const { user } = req.body;

        let userObj = new UserService();
        let userUnique = await userObj.getById(user);

        if (!user) {
            obj.setError("ID de usuario Incorreto");
            res.json(obj.obj);
            return;
        }

        if (userUnique?.premium) {
            obj.setError("Conta de usuario já é premium");
            res.json(obj.obj);
            return;
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'brl',
                    product_data: {
                        name: 'Assinatura To-do',
                    },
                    unit_amount: 50, // 1 centavo em centavos
                },
                quantity: 1,
            }],
            mode: 'payment',
            client_reference_id: user,
            success_url: 'http://localhost:8080/todo',
            cancel_url: 'http://localhost:8080/todo',
        });


        obj.setData(session);
        res.json(obj.obj);
    }

    async payConfirm(req: Request, res: Response): Promise<void> {
        try {
            const paymentSession = await stripe.checkout.sessions.retrieve(req.params.payid);
            
            if(!paymentSession.payment_intent){
                obj.setError("Pagamento ainda não foi confirmado");
                res.json(obj.obj);
                return;
            }

            const payIntentId = paymentSession.payment_intent.toString();
            const paymentIntent = await stripe.paymentIntents.retrieve(payIntentId);

            if (paymentIntent.status === 'succeeded') {
                const userId = paymentSession.client_reference_id || "";
                const userObj = new UserService();
                const up = await userObj.updateUser(userId, {premium: true});

                obj.setData(up);
                res.json(obj.obj);
                return;
            } else {
                obj.setError("Pagamento ainda não foi confirmado");
                res.json(obj.obj);
                return;
            }
        } catch (error) {
            console.error('Erro ao verificar pagamento:', error);
        }
    }
}

export default PaymentController;