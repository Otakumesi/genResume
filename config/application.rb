require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module GenResume
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.generators do |g|
      g.template_engine  :slim
      g.helper :false
      g.assets :false
      g.test_framework :rspec,
      fixture: true,
      fixture_replacement: :factory_girl,
      view_spec: false,
      routing_spec: false,
      helper_spec: false
    end

    config.action_view.field_error_proc = Proc.new do |html_tag, instance|
      "<div class='ui message negative'>#{html_tag}</div>".html_safe
    end
  end
end
