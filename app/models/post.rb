class Post
  # ===============================
  # SET UP
  # ===============================
  # add attribute readers for instance accesss
  attr_reader :id

if (ENV['DATABASE_URL'])
  uri = URI.parse(ENV['DATABASE_URL'])
  DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
else
	# connect to postgres
    DB = PG.connect({:host => "localhost", :port => 5432, :dbname => 'trendi_development'})
end

  # ===============================
  # PREPARED STATEMENTS
  # ===============================
  # create post
  DB.prepare("create_post",
    <<-SQL
      INSERT INTO posts (name, age, location, image, rank)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, age, location, image, rank;
    SQL
  )

  # update post
  DB.prepare("update_post",
    <<-SQL
      UPDATE posts
      SET name = $2, age = $3, location = $4, image = $5, rank = $6
      WHERE id = $1
      RETURNING id, name, age, location, image, rank;
    SQL
  )

  # ===============================
  # ROUTES
  # ===============================
  # index
  def self.all
    results = DB.exec("SELECT * FROM posts ORDER BY id ASC;")
    return results.map do |result|
      {
          "id" => result["id"].to_i,
          "name" => result["name"],
		  "age" => result["age"].to_i,
          "location" => result["location"],
          "image" => result["image"],
		  "rank" => result["rank"].to_i
      }
    end
  end

  # show
  def self.find(id)
    # query to find the posts
    results = DB.exec("SELECT * FROM posts WHERE id=#{id};")
    # if there are results, return the hash
    if !results.num_tuples.zero?
      return {
		"id" => result["id"].to_i,
	 	"name" => result["name"],
	 	"age" => result["age"].to_i,
	 	"location" => result["location"],
	 	"image" => result["image"],
	 	"rank" => result["rank"].to_i
      }
    # if there are no results, return an error
    else
      return {
        "error" => "no such post, check the id!"
      }, status: 400
    end
  end

  # create
  def self.create(opts)
    results = DB.exec_prepared("create_post", [opts["name"], opts["age"], opts["location"], opts["image"], opts["rank"]])
    return {
	  "id" => result["id"].to_i,
  	  "name" => result["name"],
  	  "age" => result["age"].to_i,
  	  "location" => result["location"],
  	  "image" => result["image"],
  	  "rank" => result["rank"].to_i
    }
  end

  # delete
  def self.delete(id)
    results = DB.exec("DELETE FROM posts WHERE id=#{id};")
    return { "deleted" => true }
  end

  # update
  def self.update(id, opts)
    results = DB.exec_prepared("update_post", [id, opts["name"], opts["age"], opts["location"], opts["image"], opts["rank"]])
    return {
		"id" => result["id"].to_i,
    	"name" => result["name"],
    	"age" => result["age"].to_i,
    	"location" => result["location"],
    	"image" => result["image"],
    	"rank" => result["rank"].to_i
    }
  end

end
