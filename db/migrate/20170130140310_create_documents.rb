class CreateDocuments < ActiveRecord::Migration[5.0]
  def change
    create_table :documents do |t|
      t.string :title
      t.string :content
      t.integer :template_css
      t.integer :user_id

      t.timestamps
    end
  end
end
