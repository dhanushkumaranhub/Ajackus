document.addEventListener("DOMContentLoaded", function() {
    const userTableBody = document.getElementById("userTableBody");
    const userFormContainer = document.getElementById("userFormContainer");
    const userForm = document.getElementById("userForm");
    const addUserBtn = document.getElementById("addUserBtn");
    const closeModal = document.querySelector(".close");
    let users = [];
    let editingUserId = null;

    function renderUsers() {
        userTableBody.innerHTML = users.map(user => `
            <tr id="user-${user.id}" class="user-row">
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.department}</td>
                <td>
                    <button class="edit-btn" onclick="editUser(${user.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
                </td>
            </tr>
        `).join("");
    }

    addUserBtn.addEventListener("click", function() {
        userForm.reset();
        editingUserId = null;
        document.getElementById("formTitle").textContent = "Add User";
        userFormContainer.style.display = "flex";
        userFormContainer.classList.add("fade-in");
    });

    closeModal.addEventListener("click", function() {
        userFormContainer.classList.add("fade-out");
        setTimeout(() => {
            userFormContainer.style.display = "none";
            userFormContainer.classList.remove("fade-out");
        }, 300);
    });

    userForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const department = document.getElementById("department").value;

        if (editingUserId) {
            const userIndex = users.findIndex(user => user.id === editingUserId);
            users[userIndex] = {
                id: editingUserId,
                firstName,
                lastName,
                email,
                department
            };
        } else {
            const newUser = {
                id: users.length ? users[users.length - 1].id + 1 : 1,
                firstName,
                lastName,
                email,
                department
            };
            users.push(newUser);
        }

        userFormContainer.classList.add("fade-out");
        setTimeout(() => {
            userFormContainer.style.display = "none";
            userFormContainer.classList.remove("fade-out");
        }, 300);
        renderUsers();
    });

    window.editUser = function(id) {
        const user = users.find(user => user.id === id);
        document.getElementById("firstName").value = user.firstName;
        document.getElementById("lastName").value = user.lastName;
        document.getElementById("email").value = user.email;
        document.getElementById("department").value = user.department;
        document.getElementById("formTitle").textContent = "Edit User";
        editingUserId = id;
        userFormContainer.style.display = "flex";
        userFormContainer.classList.add("fade-in");
    };

    window.deleteUser = function(id) {
        document.getElementById(`user-${id}`).classList.add("fade-out");
        setTimeout(() => {
            users = users.filter(user => user.id !== id);
            renderUsers();
        }, 300);
    };

    renderUsers();
});