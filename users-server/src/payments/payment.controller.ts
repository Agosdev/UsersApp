import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { CreatePaymentDto } from './dto/payment.dto';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('create_preference')
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      return await this.paymentService.create(createPaymentDto);
    } catch (error) {
      if (error) {
        throw new ConflictException('Could not make the order', error);
      }
      throw error;
    }
  }
}
