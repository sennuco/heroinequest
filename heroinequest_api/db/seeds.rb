# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

 heros = [{
    name: "Meena",
    atk:  70,
    def: 40,
    hp: 300,
    mp:30,
    spell:"Alakazam"
    },

    {
    name: "Mia",
    atk:  70,
    def: 40,
    hp: 300,
    mp:30,
    spell: "hocuspocus"
    }]

    Hero.create(heros)

     monsters = [{
      name: "Borg",
      atk:  75,
      def: 40,
      hp: 350,
      mp:40,
      spell: "hocuspocus"
      }]

      Monster.create(monsters)


      victories = [{
        username: "Georgette",
        scoreboard: "",
        hero_id: 1,
        monster_id: 1,
        counter: 4

      }]

      Victory.create(victories)

    puts "Seeded 🌱"
