# Instructions on usage

Build the server by running **npm run build**
Build and run the server by running **npm run start**
Run the server using the existing compiled values in dist by running **npm run runserver**
Test the code by running **npm run test**


By default server will run on http://localhost:3000. Append the API below with the expected values to test it.

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

Invalid or missing params should return a 400 error code.
