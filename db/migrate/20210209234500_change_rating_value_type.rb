class ChangeRatingValueType < ActiveRecord::Migration[6.0]
  def change
    change_column :ratings, :value, 'integer USING CAST(value AS integer)'
  end
end
