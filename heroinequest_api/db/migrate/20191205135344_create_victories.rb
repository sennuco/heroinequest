class CreateVictories < ActiveRecord::Migration[6.0]
  def change
    create_table :victories do |t|
      t.string :username
      t.string :scoreboard
      t.integer :hero_id
      t.integer :monster_id
      t.integer :counter

      t.timestamps
    end
  end
end
