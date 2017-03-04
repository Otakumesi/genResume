# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w( semantic_ui/*.min.css semantic_ui/*.min.js keiyaku.css semantic_ui/*/*.css semantic_ui/*/*.js semantic_ui/*/*.eot semantic_ui/*/*.svg semantic_ui/*/*.woff semantic_ui/*/*.woff2 semantic_ui/*/*.svg semantic_ui/*/*.ttf )
