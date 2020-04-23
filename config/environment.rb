# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

ActionMailer::Base.smtp_settings = {
  :address => 'smtp.mailgun.org',
  :port => '587',
  :authentication => :plain,
  :user_name => 'postmaster@sandboxc5c164aa4d8648ea909de143b36cee12.mailgun.org', #Rails.application.credentials.sendgrid[:username],
  :password => '716206cd2262b0832e1142d89c8d01e7-f135b0f1-1af2ae83', #Rails.application.credentials.sendgrid[:password],
  :domain => 'sandboxc5c164aa4d8648ea909de143b36cee12.mailgun.org',
  :enable_starttls_auto => true
}
