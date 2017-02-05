require 'rails_helper'

RSpec.describe User, type: :model do

  let(:user) { create(:user) }
  it { expect(user).to respond_to(:email) }
  it { expect(user).to respond_to(:password) }
  it { expect(user).to respond_to(:password_confirmation) }
  it { expect(user).to respond_to(:encrypted_password) }

  it { expect(user).to respond_to(:documents) }
end
