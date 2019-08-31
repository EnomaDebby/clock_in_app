class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :events
  has_many :clock_in_events
  has_many :clock_out_events

  validates_presence_of :first_name, :last_name

  attr_accessor :reason, :logged_at, :event_type
end
