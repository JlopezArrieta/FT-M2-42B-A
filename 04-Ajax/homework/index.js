const [lista] = $('#lista');
const [boton] = $('#boton');
const URL = 'http://localhost:5000';

const listFriends = (friends) => {
    lista.innerHTML = '';
    friends.forEach(({ id, name }) => {//friend = {id, name, mail} por destructuri puedo poner en ves de friend todas su info. En este caso pongo las que necesito
        const li = document.createElement('li');
        li.innerHTML = `${id} - ${name}`;
        lista.appendChild(li);
    });
};

const showFriends = () => {
    $.get(`${URL}/amigos`, listFriends);
};

boton.addEventListener('click', showFriends);

//***************************************************//
const [input] = $('#input');
const [search] = $('#search');
const [amigo] = $('#amigo');

const writeName = (friend) => {
    input.value.innerHTML = '';
    amigo.innerHTML = friend.name;
};

const showFriendName = () => {
    const id = input.value;
    $.get(`${URL}/amigos/${id}`, writeName);
    input.value = '';
};
// .fail(amigo.text('Este amigo no existe'))

search.addEventListener('click', showFriendName);


//***************************************************//
const [inputDelete] = $('#inputDelete');
const [deleteButton] = $('#delete');
const [success] = $('#success');


const deleteFriend = () => {
    const id = inputDelete.value;
    $.ajax({
        type: "DELETE",
        url: `${URL}/amigos/${id}`,
        success: () => {
            inputDelete.value = '';
            success.innerHTML = `Amigo con id: ${id} eliminado con exito`;
            showFriends();
        },
    });
};

deleteButton.addEventListener('click', deleteFriend);







