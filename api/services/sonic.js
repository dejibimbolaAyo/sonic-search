import sonicSearch from "../../database/sonic";
import sonicIngest from "../../database/sonic/ingest";
import sonicControl from "../../database/sonic/control";

exports.ingest = async (collection, fields) => {
  // Supply model to injest
  for (let index = 0; index < collection.length; index++) {
    const user = collection[index];
    await sonicIngest().push(
      'users',
      'default',
      user._id,
      `${user.firstName} ${user.lastName}`
    );
  }
  // disconnect from store
  sonicControl().close()
    .then(function () {
      // Close success handler
    })
    .catch(function (error) {
      // Close errors come there
      console.log(error)
    });

  return {
    status: true,
    message: "Ingestion completed"
  }
}

exports.query = async (collection, query) => {
  const search = await sonicSearch().query(
    collection,
    'default',
    query
  )
  sonicControl().close()
    .then(function () {
      // Close success handler
    })
    .catch(function (error) {
      // Close errors come there
      console.log(error)
    });

  return {
    status: true,
    message: "Search completed",
    data: search
  }
}