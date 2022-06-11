class CreateArticles < ActiveRecord::Migration[7.0]
  def change
    create_table :articles do |t|
      t.string :headline
      t.string :authors
      t.string :source_url
      t.string :date
      t.string :content

      t.timestamps
    end
  end
end
