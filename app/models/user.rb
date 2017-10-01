class User < ActiveRecord::Base
  validates :firstName, :lastName, :email, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 8 }

  has_secure_password
end
