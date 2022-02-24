
// All Elements
const all_skills = document.querySelector('#all_skills');
const devsAddForm = document.querySelector('#devsAddForm');
const editDevsForm = document.querySelector('#editDevsForm');
const loadDevsData = document.querySelector('#load_devs_data');
const edit_modal = document.querySelector('#edit_modal');

// All Skills loade form API
const skillsLoad = () => {

    axios.get('http://localhost:5050/skills').then(data => {

        let skill_list = '';
        data.data.map(skills => {
            skill_list += `<option value="${skills.id}">${skills.skill}</option>`;
        });

        all_skills.insertAdjacentHTML('beforeend', skill_list);

    })

};
skillsLoad();


/**
 * Devs Data load Form API
 */

const loadDevelopers = () => {

    let devs_data = '';
    axios.get('http://localhost:5050/developers').then(res => {
        res.data.map(( devs, index ) => {
            devs_data += `
                <tr>
                    <td>${ index + 1 }</td>
                    <td>${ devs.name }</td>
                    <td>${ devs.email }</td>
                    <td>${ devs.phone }</td>
                    <td>${ devs.age }</td>
                    <td>${ devs.location }</td>
                    <td><img style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;" src="${ devs.image }" alt=""></td>
                    <td>
                        <a data-bs-toggle="modal" class="btn btn-sm shadow-none btn-secondary" onclick="viewDevelopers(${devs.id})" href="#modal_view"><i class="fa fa-eye"></i></a>
                        <a data-bs-toggle="modal" class="btn btn-sm shadow-none btn-info" onclick="editDevelopers(${ devs.id })" href="#edit_modal"><i class="fa fa-edit"></i></a>
                        <a data-bs-toggle="modal" class="btn btn-sm shadow-none btn-danger" onclick="deleteDevelopers(${devs.id})" href="#delete_modal"><i class="fa fa-trash"></i></a>
                    </td>
                </tr>
            `;
        });

        loadDevsData.innerHTML = devs_data;
        
    });

};
loadDevelopers();

/**
 * Add New Devs
 */
devsAddForm.addEventListener('submit', function(e){
    e.preventDefault();

    let name = this.querySelector('#name');
    let email = this.querySelector('#email');
    let phone = this.querySelector('#phone');
    let all_skills = this.querySelector('#all_skills');
    let age = this.querySelector('#age');
    let location = this.querySelector('#location');
    let image = this.querySelector('#image');

    if( name.value == '' || email.value == '' || phone.value == '' || all_skills.value == '' || age.value == '' || location.value == '' || image.value == '' ){
        alert('All fields are required');
    }else{

        axios.post('http://localhost:5050/developers', {
            id          : "",
            name        : name.value,
            email       : email.value,
            phone       : phone.value,
            all_skillsId: all_skills.value,
            age         : age.value,
            location    : location.value,
            image       : image.value
        }).then(res => {
            name.value = '';
            email.value = '';
            phone.value = '';
            all_skills.value = '';
            age.value = '';
            location.value = '';
            image.value = '';

            loadDevelopers();
        });
        
    }

});

/**
 * Edit Developers
 */
function editDevelopers(id){

    let editName = document.querySelector('#editName');
    let editEmail = document.querySelector('#editEmail');
    let editPhone = document.querySelector('#editPhone');
    let edit_all_skills = document.querySelector('#edit_all_skills');
    let editAge = document.querySelector('#editAge');
    let editLocation = document.querySelector('#editLocation');
    let editImage = document.querySelector('#editImage');
    let preview = document.querySelector('#editPreview');
    let editId = document.querySelector('#editId');

    axios.get(`http://localhost:5050/developers/${id}`).then(res => {
        editName.value = res.data.name;
        editEmail.value = res.data.email;
        editPhone.value = res.data.phone;
        edit_all_skills.value = res.data.all_skillsId;
        editAge.value = res.data.age;
        editLocation.value = res.data.location;
        editImage.value = res.data.image;
        editId.value = id;
        preview.setAttribute('src', res.data.image);
    });
};

/**
 * Devs Edit Form
 */
editDevsForm.addEventListener('submit', function(e){
    e.preventDefault();

    let editName = this.querySelector('#editName');
    let editEmail = this.querySelector('#editEmail');
    let editPhone = this.querySelector('#editPhone');
    let edit_all_skills = this.querySelector('#edit_all_skills');
    let editAge = this.querySelector('#editAge');
    let editLocation = this.querySelector('#editLocation');
    let editImage = this.querySelector('#editImage');
    
    axios.patch(`http://localhost:5050/developers/${editId.value}`,{
            id          : "",
            name        : editName.value,
            email       : editEmail.value,
            phone       : editPhone.value,
            all_skillsId: edit_all_skills.value,
            age         : editAge.value,
            location    : editLocation.value,
            image       : editImage.value
        }).then(res => {
            
            editName.value = '';
            editEmail.value = '';
            editPhone.value = '';
            all_skills.value = '';
            age.value = '';
            location.value = '';
            image.value = '';

            loadDevelopers();
        });

});


/**
 *  Delete Developers Data
 */
const deleteData = document.getElementById('deleteData');
function deleteDevelopers(id){
    deleteData.setAttribute( 'delid', id );
};

// Delete Data form API
deleteData.addEventListener('click', function(){
    let del_id = this.getAttribute('delid');
    axios.delete(`http://localhost:5050/developers/${del_id}`).then(res => {
        loadDevelopers();
    });

});


/**
 *  View Developers Info
 */
function viewDevelopers(id){
    const modal_view = document.getElementById('modal_view');
    axios.get(`http://localhost:5050/developers/${ id }`).then(data => {

        axios.get(`http://localhost:5050/skills/${ id }`).then( res => {

            modal_view.querySelector('.modal-body').innerHTML = `
            <div class="card clearfix">
                <div class="card-header bg-secondary text-white">
                    <h2>Your Information</h2>
                </div>
                <img class="card-img"  src="${ data.data.image }" alt="">
                <div class="card-body">
                    <div class="div-01 float-start">
                        <h5>Name:</h5>
                        <h5>Skill:</h5>
                        <h5>Email:</h5>
                        <h5>Number:</h5>
                        <h5>Age:</h5>
                        <h5>Location:</h5>
                    </div>
                    <div class="div-02 float-end">
                        <span>${ data.data.name }</span><br>
                        <span>${ res.data.skill}</span><br>
                        <span>${ data.data.email }</span><br>
                        <span>${ data.data.phone }</span><br>
                        <span>${ data.data.age }</span><br>
                        <span>${ data.data.location }</span><br>
                    </div>
                </div>
                <div class="card-footer bg-secondary text-white text-center">Thank you</div>
            </div>
        `;
        });
        
    });

};

