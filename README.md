# Instructions on usage

Build and run the server by running **npm run start**

By default server will run on http://localhost:3000

# API

/api/images?filename={filename}&width={width value}&height={height value}


paramters:
| Parameter Name | Purpose |
|----------------|----------|
| filename  | name of the image on server, minus extension |
| width | width to resize the image to |
| height | height to resize the image to |

example:
GET http://localhost:3000/api/images?filename=fjord&width=200&height=200
