import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/payment.dto';
import { MercadoPagoConfig, Preference } from 'mercadopago';

@Injectable()
export class PaymentService {
  async create(createPaymentDto: CreatePaymentDto): Promise<any> {
    const client = new MercadoPagoConfig({
      accessToken: `${process.env.MP_ACCESS_TOKEN}`,
      options: { timeout: 5000 },
    });

    const preference = new Preference(client);
    const response = await preference
      .create({
        body: {
          items: [
            {
              id: createPaymentDto.id,
              title: createPaymentDto.title,
              quantity: Number(createPaymentDto.quantity),
              unit_price: Number(createPaymentDto.unit_price),
              currency_id: createPaymentDto.currency_id,
            },
          ],
          back_urls: {
            success: 'http://localhost:5173',
            failure: 'http://localhost:5173',
            pending: '',
          },
          auto_return: 'approved',
        },
      })
      .then((data) => data.id)
      .catch((err) => err);

    return response;
  }
}
