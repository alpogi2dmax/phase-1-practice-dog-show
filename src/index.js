document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('form');

    function getAllDogs() {
        fetch('http://localhost:3000/dogs/') 
        .then(res => res.json())
        .then(dogData => {
            document.querySelector('#table-body').innerHTML = "";
            dogData.forEach(dog => renderOneDog(dog));
        });
    }

    getAllDogs();

    function renderOneDog(dog) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td id=${dog.id}>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button class='edit-button'>Edit</button></td>
        `
        tr.querySelector('.edit-button').addEventListener('click', () => {
            form.querySelectorAll('input')[0].value = tr.querySelectorAll('td')[0].id;
            form.querySelectorAll('input')[1].value = tr.querySelectorAll('td')[0].innerText;
            form.querySelectorAll('input')[2].value = tr.querySelectorAll('td')[1].innerText;
            form.querySelectorAll('input')[3].value = tr.querySelectorAll('td')[2].innerText;
        });   

        document.querySelector('#table-body').appendChild(tr);

    }        

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let dogObj = {
            id: e.target.querySelectorAll('input')[0].value,
            name: e.target.querySelectorAll('input')[1].value,
            breed: e.target.querySelectorAll('input')[2].value,
            sex: e.target.querySelectorAll('input')[3].value
            }
            fetch(`http://localhost:3000/dogs/${dogObj.id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(dogObj)
              })
              .then(res => res.json())
              .then(dog => {
                form.reset();
                getAllDogs();
                });
        });

})