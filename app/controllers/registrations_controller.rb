class RegistrationsController < Devise::RegistrationsController
  skip_before_action :authorized
end