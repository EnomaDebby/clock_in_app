class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :type
      t.string :reason
      t.datetime :logged_at
      t.integer :user_id

      t.timestamps
    end
  end
end
