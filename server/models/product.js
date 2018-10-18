const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongooselAlgolia = require('mongoose-algolia');

const ProductSchema = new Schema({

  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  image: String,
  title: String,
  description: String,
  price: Number,
  created: { type: Date, default: Date.now }
});

ProductSchema.plugin(mongooselAlgolia, {
  appId: 'V0Z65ZQAJE',
  apiKey: '124c4a83a85aadc48043f32ab8075a9d',
  indexName: 'WEBAPPANGULAR',
  selector: '_id title image description price owner created',
  populate: {
    path: 'owner',
    select: 'name'
  },
  default: {
    author: 'unknown'
  },
  mappings: {
    title: function(value) {
      return `${value}`
    }
  },
  virtuals: {},
  debug: true
})

let Model = mongoose.model('Product', ProductSchema);
Model.SyncToAlgolia();
Model.SetAlgoliaSettings({
  searchableAttributes: ['title']
});
module.exports = Model
