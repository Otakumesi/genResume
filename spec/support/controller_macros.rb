module ControllerMacros
  def add_session(args)
    args.each { |k, v| session[k] = v }
  end

  def login_user
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      user = create(:user)
      sign_in user, scope: :user
    end
  end
end
