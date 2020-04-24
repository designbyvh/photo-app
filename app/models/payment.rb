class Payment < ApplicationRecord
  attr_accessor :card_number, :card_cvv, :card_expires_month, :card_expires_year
  belongs_to :user

  def self.month_options
    Date::MONTHNAMES.compact.each_with_index.map { |name, i| ["#{i+1} - #{name}", i+1] }
  end

  def self.year_options
    (Date.today.year..(Date.today.year+10)).to_a
  end

  def process_payment
    # customer = Stripe::Customer.create email: email, card: token
    puts "Creating charge..."
    # Stripe::Charge.create customer: customer.id,
    #                      amount: 1000,
    #                      description: 'Premium',
    #                      currency: 'usd'
    charge = Stripe::Charge.create({
      amount: 1000,
      currency: 'usd',
      description: 'Premium',
      source: token
    })
    puts "Charge successful!"

    #customer = Stripe::Customer.create({ email: email })
    #payment_method = Stripe::PaymentMethod.create({
    #  type: 'card',
    #  card: {
    #    number: card_number,
    #    exp_month: card_expires_month,
    #    exp_year: card_expires_year,
    #    cvc: card_cvv
    #  }
    #})
  #   Stripe::PaymentIntent.create({
  #     amount: 1000,
  #     customer: customer[:id],
  #     currency: 'usd',
  #     description: 'Premium',
  #     confirm: true,
  #     payment_method: payment_method[:id]
  #
  #   })
  end

end
