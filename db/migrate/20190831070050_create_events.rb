class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.datetime :logged_at
      t.string :type
      t.text :reason
      t.integer :user_id

      t.timestamps
    end
  end
end
