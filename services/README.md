function name = csvTojson().

object destructuring syntax is used to extract the firstName, lastName, age, address properties, and the rest of the properties are collected into an additional object using the spread operator .... The ('+') unary function is used to parse the age string into a number. Finally, the output object is constructed using shorthand notation to simplify the syntax. The users array is returned containing the transformed objects.

function name = calAgeDistribution().

I've used an asynchronous function getAgeDistribution that uses await to wait for the count queries to complete before returning the ageDistribution object. The Promise.all method is used to run the count query for each age group in parallel. The Op object is used to define the conditions for the age range.Proper error handling has also been implemented using a try-catch block. I've also destructured the name property of each age group directly in the map function and returned an object with only the necessary properties for each age group.

Why 'csvtojson' ?

Use streams: Instead of reading the entire file into memory at once, they have use streams to read and process the data in smaller chunks. This can help reduce memory usage and improve performance for large files.

Use async/await: The fs.readFileSync method is synchronous, which means it blocks the event loop while it's reading the file. Using the asynchronous fs.readFile method with async/await can help improve performance by allowing other operations to run while the file is being read.
