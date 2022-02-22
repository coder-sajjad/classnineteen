
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
                    <td>${ devs.all_skillsId }</td>
                    <td>${ devs.age }</td>
                    <td>${ devs.location }</td>
                    <td><img style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;" src="${ devs.image }" alt=""></td>
                    <td>
                        <a data-bs-toggle="modal" class="btn btn-sm btn-primary" href="#modal_view"><i class="fa fa-eye"></i></a>
                        <a data-bs-toggle="modal" class="btn btn-sm btn-info" onclick="editDevelopers(${ devs.id })" href="#edit_modal"><i class="fa fa-edit"></i></a>
                        <a data-bs-toggle="modal" class="btn btn-sm btn-danger" href="#modal_delete"><i class="fa fa-trash"></i></a>
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
        editName.value = res.data.name ;
        editEmail.value = res.data.email ;
        editPhone.value = res.data.phone ;
        edit_all_skills.value = res.data.all_skillsId;
        editAge.value = res.data.age ;
        editLocation.value = res.data.location ;
        editImage.value = res.data.image ;
        editId.value = id ;
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
    let editAge = this.querySelector('#age');
    let editLocation = this.querySelector('#editLocation');
    let editImage = this.querySelector('#editImage');
    

    axios.patch(`http://localhost:5050/developers/${editId.value}`, {
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


 });