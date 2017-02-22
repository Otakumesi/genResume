require "rails_helper"

RSpec.describe Users::RegistrationsController, type: :controller do
  context "non required authentication" do
    describe "#new" do
      it "assigns a new document as @document" do
        get :new
        expect(assigns(:user)).to be_a_new(User)
      end

      it "renders the new view" do
        get :new
        expect(response).to render_template(:new)
      end
    end
  end

  context "required authentication" do
    login_user
    before do
      @user = subject.current_user
    end
  end
end
