require "securerandom"

class User < ApplicationRecord
  has_secure_password
  has_many :articles
  after_initialize :handle_after_initialize

  # TODO Use active_model_serializer
  def serialize
    {
      id: id,
      email: email,
      name: name
    }
  end


  private
  def reset_password
    self.password = SecureRandom.base64(16)
  end


  def handle_after_initialize
    if self.password_digest.blank?
      reset_password
    end
  end
end
