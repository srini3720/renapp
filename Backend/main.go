package main

import (
	"fmt"
	"log"
	"net/http"
	"database/sql"

	"encoding/json"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	router := mux.NewRouter()

	//routes
	router.HandleFunc("/signup", SignupHandler).Methods("POST") // Route for signup
	router.HandleFunc("/login", LoginHandler).Methods("POST") // Route for login
	router.HandleFunc("/updateUser", updateUserHandler).Methods("POST") // Route for login


	//cors issues fix
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Accept", "Accept-Encoding", "Accept-Language", "Connection", "Content-Length", "Content-Type", "Host", "Origin", "Referer", "User-Agent", "transformRequest", "ShibCookie"},
		AllowCredentials: true,
	})

	Handler := c.Handler(router)

	log.Println("Server started on port 8095")
	log.Fatal(http.ListenAndServe(":8095", Handler))
}

//user datastruct 
type User struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Contact string  `json:"contact"`
	Dob     string  `json:"dob"`
	Age     int     `json:"age"`
}



//handlers  TODO: Add in separate handler Folder

//sign up handler
func SignupHandler(w http.ResponseWriter, r *http.Request) {
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// fmt.Println("User",user.Email)

	register := RegisterUser(&user)
	fmt.Println("register",register)

	if register {
		response := map[string]string{"message": "Signup successful"}
		jsonResponse, err := json.Marshal(response)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsonResponse)
	}
}



//Login Handler
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}


	Login := LoginUser(&user)

	if Login {
		response := map[string]string{"message": "Login successful"}
		jsonResponse, err := json.Marshal(response)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsonResponse)

	}


}




//updateUser handler
func updateUserHandler(w http.ResponseWriter, r *http.Request) {
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	updateUser := updateUser(&user)

	jsonResponse, err := json.Marshal(updateUser)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)

}



//controller TODO: include in separate controller folder

func RegisterUser(user *User) bool {


		// TODO: abstract into separate file and use
		dbCon, err := sql.Open("mysql", "root:rootadmin3720@tcp(localhost:3306)/renapp")
		if err != nil {
			fmt.Println("Error connecting to the database:", err)
			return false
		}
		defer dbCon.Close()

		stmt, err := dbCon.Prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)")
		if err != nil {
			fmt.Println("Error preparing SQL statement:", err)
			return false
		}
		defer stmt.Close()

		_, err = stmt.Exec(user.Username, user.Email, user.Password)
		if err != nil {
			fmt.Println("Error executing SQL statement:", err)
			return false
		}

		fmt.Println("User registered successfully")
		return true
}

func LoginUser(user *User) bool {

	db, err := sql.Open("mysql", "root:rootadmin3720@tcp(localhost:3306)/renapp")
	if err != nil {
		fmt.Println("Error connecting to the database:", err)
		return false
	}
	defer db.Close()

	query := "SELECT username,email,password FROM users WHERE email = ?"
	row := db.QueryRow(query, user.Email)

	fmt.Println("username",user.Email)
	var appUser User
	err = row.Scan(&appUser.Username, &appUser.Email, &appUser.Password)
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("User not found")
		} else {
			fmt.Println("Error retrieving user:", err)
		}
		return false
	}

	// Verify the password
	if appUser.Password != user.Password {
		fmt.Println("Incorrect password")
		return false
	}

	fmt.Println("User logged in successfully")
	return true
}




func updateUser(user *User) *User {

	db, err := sql.Open("mysql", "root:rootadmin3720@tcp(localhost:3306)/renapp")
	if err != nil {
		fmt.Println("Error connecting to the database:", err)
		return user
	}
	defer db.Close()

	// Prepare the UPDATE statement
	stmt, err := db.Prepare("UPDATE users SET username = ?,contact = ?, dob=?, age=? WHERE email = ?")
	if err != nil {
		fmt.Println("Error preparing SQL statement:", err)
		return user
	}
	defer stmt.Close()

	_, err = stmt.Exec(user.Username,user.Contact,user.Dob,user.Age,user.Email)
	if err != nil {
		fmt.Println("Error executing SQL statement:", err)
		return user
	}

	return user
}
