import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  avatar: String,
  username: String,
});

const RepositoriesSchema = new Schema({
  owner: String,
  repoName: String,
  href: String,
  description: String,
  programmingLanguage: String,
  repoLanguageColor: String,
  starsTotal: Number,
  forkTotal: Number,
  starsToday: Number,
  contributors: String,
  builtBy: [MemberSchema],
});

const GithubTrendingSchema = new Schema({
  createDate: Date,
  repositories: [RepositoriesSchema],
});

const GithubTrending = mongoose.model('GithubTrending', GithubTrendingSchema);

export default GithubTrending;
