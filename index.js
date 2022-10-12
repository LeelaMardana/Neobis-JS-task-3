const task_3 = () => {
  const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

  const sendBtn = document.querySelectorAll('.buttons .button')[0];
  const deleteBtn = document.querySelectorAll('.buttons .button')[1];

  const toggleLoader = () => {
    const loaderHTML = document.querySelector('#loader');
    const isHidden = loaderHTML.getAttribute('hidden') !== null;
    if (isHidden) {
      loaderHTML.removeAttribute('hidden');
    } else {
      loaderHTML.setAttribute('hidden', '');
    }
  };

  const createWrap = () => {
    const items = document.createElement('ul');
    items.classList.add('data-items');
    document.querySelector('.items').append(items);
  };

  sendBtn.addEventListener('click', () => {
    const dataItems = document.querySelector('.data-items');
    dataItems.remove();
    createWrap();
    request();
  });

  deleteBtn.addEventListener('click', () => {
    const dataItems = document.querySelector('.data-items');
    if (dataItems.childNodes.length === 0) return;
    dataItems.remove();
    createWrap();
  });

  const render = (id, title, text) => {
    const item = document.createElement('li');
    const itemTitle = document.createElement('h3');
    const itemText = document.createElement('p');

    item.classList.add('data-item');
    itemTitle.classList.add('data-item__title');
    itemText.classList.add('data-item__text');

    itemTitle.innerHTML = `<span class="id">#${id}.</span> ${title}`;
    itemText.textContent = text;

    item.append(itemTitle);
    item.append(itemText);

    document.querySelector('.data-items').append(item);
  };

  const request = async () => {
    try {
      toggleLoader();
      const response = await fetch(POSTS_URL);
      const result = await response.json();
      result.map(post => render(post.id, post.title, post.body));
    } catch (error) {
      console.error('Something went wrong', error);
    } finally {
      toggleLoader();
    }
  };
};
task_3();

const task_5 = () => {
  const APIKEY = 'CFciMzfca4Y4bjB2xt9hok2opMX1e9xH';
  const amount = 9;
  const button = document.querySelector('.task-5__button');

  const render = content => {
    if (content.data.length === 0) {
      const error = document.createElement('div');
      error.classList.add('error');
      document.querySelector('form').after(error);
      error.textContent = "We can't find your request";
      document.querySelector('.search').value = '';
    } else {
      const out = document.createElement('div');
      out.classList.add('out');
      document.querySelector('form').after(out);

      content.data.forEach(item => {
        let figure = document.createElement('figure');
        let img = document.createElement('img');
        let figcaption = document.createElement('figcaption');

        img.src = item.images.downsized.url;
        img.alt = item.title;
        figcaption.textContent = item.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        out.append(figure);
      });
      document.querySelector('.search').value = '';
    }
  };

  button.addEventListener('click', e => {
    e.preventDefault();

    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=${amount}&q=`;
    let input = document.querySelector('.task-5__content input').value.trim();

    if (!input) return;

    const checkBefore = document.querySelector('.out');
    const checkError = document.querySelector('.error');
    if (checkError) checkError.remove();
    if (checkBefore) checkBefore.remove();

    url = url.concat(input);
    fetch(url)
      .then(response => response.json())
      .then(content => {
        render(content);
      })
      .catch(err => console.log(err));
  });
};
task_5();
