json.extract! document, :id, :content, :title, :user_id, :created_at, :updated_at
json.url user_document_url(document, format: :json)
