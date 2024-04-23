const livroList = document.querySelector('#aluno-form');

function renderAluno(doc){


    let list = document.createElement('li');
    let nome = document.createElement('span');
    let cpf = document.createElement('span');
    let rg = document.createElement('span');
    let telAluno = document.createElement('span');
    let telResponsavel = document.createElement('span');
    let email = document.createElement('span');
    let dtNascimento = document.createElement('span');

    let excluir = document.createElement('div');

    excluir.textContent = 'X';

    list.setAttribute('data-id', doc.id);
    nome.textContent = doc.data().nome;
    cpf.textContent = doc.data().cpf;
    rg.textContent = doc.data().rg;
    telAluno.textContent = doc.data().telAluno;
    telResponsavel.textContent = doc.data().telResponsavel;
    email.textContent = doc.data().email;
    dtNascimento.textContent = doc.data().dtNascimento;

    
    list.appendChild(nome);
    list.appendChild(cpf);
    list.appendChild(rg);
    list.appendChild(telAluno);
    list.appendChild(telResponsavel);
    list.appendChild(email);
    list.appendChild(dtNascimento);

    list.appendChild(excluir);

    livroList.appendChild(list);


    excluir.addEventListener('click', (e) =>{
        e.stopPropagation()

        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('bd3-nosql-atv5').doc(id).delete()
            .then(()=>{window.location.reload()})
        

    });

};

db.collection('bd3-nosql-atv5')
    .get()
    .then(
        (snapshot)=> {
            snapshot.docs.forEach(doc => {
                renderBook(doc);
            });
        }
    );

const form = document.querySelector('#add-aluno-form');

form.addEventListener('submit', (event)=>{

    event.preventDefault();
    db.collection('bd3-nosql-atv5')
    .add({
        nome: form.nome.value,
        cpf: form.cpf.value,
        rg: form.rg.value,
        telAluno: form.telAluno.value,
        telResponsavel: form.telResponsavel.value,
        email: form.email.value,
        dtNascimento: form.dtNascimento.value
    })

    .then(()=>{
        form.nome.value = '';
        form.cpf.value = '';
        form.rg.value = '';
        form.telAluno.value = '';
        form.telResponsavel.value = '';
        form.email.value = '';
        form.dtNascimento.value = '';
        window.location.reload()
    })

});