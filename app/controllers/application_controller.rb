class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  private

  def store_current_location
    if request.format == "text/html" || request.content_type == "text/html"
      store_location_for(:user, request.url)
    end
  end
end
