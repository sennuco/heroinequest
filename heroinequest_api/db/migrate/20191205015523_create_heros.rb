class CreateHeros < ActiveRecord::Migration[6.0]
  def change
    create_table :heros do |t|
      t.string :name
      t.integer :atk
      t.integer :def
      t.integer :hp
      t.integer :mp
      t.string :spell

      t.timestamps
    end
  end
end
