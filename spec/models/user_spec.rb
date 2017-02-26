require 'rails_helper'

RSpec.describe User, type: :model do

  let(:user) { create(:user) }
  it { expect(user).to respond_to(:email) }
  it { expect(user).to respond_to(:password) }
  it { expect(user).to respond_to(:password_confirmation) }
  it { expect(user).to respond_to(:encrypted_password) }
  it { expect(user).to respond_to(:role) }
  it { expect(user).to respond_to(:provider) }
  it { expect(user).to respond_to(:uid) }
  it { expect(user).to respond_to(:documents) }

  describe "email" do
    context "with valid email" do
      before do
        @user = build(:user)
      end
      it { expect(@user).to be_valid }
    end

    context "empty email" do
      before do
        @user = build(:user, email: "")
      end
      it { expect(@user).not_to be_valid }
    end

    context "with invalid email" do
      before do
        @user = build(:user, email: "@agent")
      end
      it { expect(@user).not_to be_valid }
    end

    context "duplicated email" do
      before do
        @another_user = create(:user)
        @user = build(:user, email: @another_user.email)
      end
      it { expect(@user).not_to be_valid }
    end
  end

  describe "password" do
    context "empty password" do
      before do
        @user = build(:user, password: "")
      end
      it { expect(@user).not_to be_valid }
    end

    context "too short password" do
      before do
        @user = build(:user, password: "pass")
      end
      it { expect(@user).not_to be_valid }
    end
  end
end
