//username and room infos are present here, very useful stuff
// console.log(Qs.parse(location.search, {
//   ignoreQueryPrefix: true,
// }))

const { username, room } = Qs.parse(location.search, {
  //keep it true to select only the queries
  ignoreQueryPrefix: true,
})

