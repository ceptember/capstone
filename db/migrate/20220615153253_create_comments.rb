class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.integer :user_id
      t.integer :article_id
      t.string :comment_text
      t.integer :likes, array: true, default: [] #Array of user ids 

      t.timestamps
    end
  end
end
