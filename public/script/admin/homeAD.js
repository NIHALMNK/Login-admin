

function openAddUserModal() {
    document.getElementById('addUserModal').style.display = 'block';
}

function closeAddUserModal() {
    document.getElementById('addUserModal').style.display = 'none';
    document.getElementById('addUserForm').reset();
    window.location.href = "/admin/home"
}
//===========================================================

//============================================================
// Open and close Edit User Modal
function openEditUserModal(id, name, email, gender) {
    document.getElementById('editUserModal').style.display = 'block';
    document.getElementById('editUserId').value = id;
    document.getElementById('editName').value = name;
    document.getElementById('editEmail').value = email;
    document.getElementById('editGender').value = gender;
}

function closeEditUserModal() {
    document.getElementById('editUserModal').style.display = 'none';
    document.getElementById('editUserForm').reset();
}

// Delete User function
let userIdToDelete;

function deleteUser(userId) {
    userIdToDelete = userId; // Store the userId to delete
    document.getElementById("deleteModal").style.display = "block"; 
}

function closeModal() {
    document.getElementById("deleteModal").style.display = "none"; 
}

// Confirm delete button functionality
document.getElementById("confirmDelete").onclick = function() {
    window.location.href = `/admin/delete-user/${userIdToDelete}`; 
    closeModal();
}

// Close the modal when clicking outside of the modal content
window.onclick = function(event) {
    const modal = document.getElementById("deleteModal");
    if (event.target == modal) {
        closeModal();
    }
}

//add user

document.getElementById('addUserForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('addName').value;
    const namePattern = /^[A-Za-z][A-Za-z0-9]{2,}$/;
    if (!namePattern.test(name)) {
        swal({
            title: "Name should start with a letter and contain only letters and numbers. Special characters are not allowed.",
            text: "Please update it properly.",
            timer: 6000,
        });
        return;
    }

    const email = document.getElementById('addEmail').value;
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(email)) {
        swal({
            title: "Please enter a valid email address.",
            text: "Please update it properly.",
            timer: 6000,
        });
        return;
    }

    const password = document.getElementById('addPassword').value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
        swal({
            title: "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character.",
            text: "Please update it properly.",
            timer: 6000,
        });
        return;
    }

    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        swal({
            title: "Passwords do not match.",
            text: "Please update it properly.",
            timer: 6000,
        });
        return;
    }

    fetch('http://localhost:3000/admin/user', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, gender: document.getElementById('addGender').value, password })
    })
    .then((response) => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.message);
            });
        }
        return response.json();
    })
    .then((data) => {
        swal({
            title: "Success!",
            text: data.message,
            icon: "success",
        });
        closeAddUserModal(); // Close the modal on success
    })
    .catch((error) => {
        if (error.message === "User already exists.") {
            swal({
                title: "User already exists.",
                text: "Please try a different email.",
                icon: "warning",
                timer: 6000,
            });
        } else {
            swal({
                title: "An error occurred.",
                text: "Please try again later.",
                icon: "error",
                timer: 6000,
            });
        }
        console.error('There was a problem with the fetch operation:', error);
    });
});


// Edit User Form Validation
document.getElementById('editUserForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('editName').value;
    const namePattern = /^[A-Za-z][A-Za-z0-9]{2,}$/;

    if (!namePattern.test(name)) {
        swal({
            title: "Name should start with a letter and contain only letters and numbers. Special characters are not allowed.",
            text: "Please update it properlly",
            timer: 6000,
        });
        return;
    }


    const password = document.getElementById('editPassword').value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    // If a new password is provided, validate it
    if (password && !passwordPattern.test(password)) {
        // alert("New Password must be at least 8 characters long and should not contain spaces.");
        swal({
            title: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character",
            text: "Please update it properlly",
            timer: 6000,
        });
        
        return;
    }

    event.target.submit();

   
});

