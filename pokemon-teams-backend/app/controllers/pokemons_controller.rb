class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    render json: pokemon
  end

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.new(nickname: name, species: species, trainer_id: pokemon_params[:trainer_id])
    if pokemon.trainer.pokemons.count < 6
      pokemon.save
      render json: pokemon, status: 201
    else
      render json: :error, status: :not_found
    end

    
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
    
  end

  private
  def pokemon_params
    params.require(:pokemon).permit(:nickname, :species, :trainer_id)
  end
end
