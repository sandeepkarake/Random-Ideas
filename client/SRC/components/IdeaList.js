import IdeasApi from "../services/IdeasApi";
import ideasApi from "../services/IdeasApi";

class IdeaList {
    constructor() {
        this._IdeaListEl = document.querySelector('#idea-list');

        this._ideas = [];
        this.getIdeas();

        this._validTags = new Set();
        this._validTags.add('technology')
        this._validTags.add('software')
        this._validTags.add('business')
        this._validTags.add('education')
        this._validTags.add('health')
        this._validTags.add('invention')
    }
    addEventListener() {
        this._IdeaListEl.addEventListener('click', (e) => {
            if (e.target.classList.contains('fa-times')) {
                e.stopImmediatePropagation();
                const ideaId = e.target.parentElement.
                    parentElement.dataset.id;
                this.deleteIdea(ideaId);
            }
        })
    }
    async getIdeas() {
        try {
            const res = await ideasApi.getIdeas();
            this._ideas = res.data.data;
            // console.log(this._ideas)
        } catch (error) {
            console.log(error)
        }
        this.render();
    }

    async deleteIdea(ideaId) {
        try {
            // Delete from server
            const res = await IdeasApi.deleteIdea(ideaId);
            this._ideas.filter((idea) => { idea._id !== ideaId })
            this.getIdeas();
        } catch (error) {
            alert('you can not delete this resource')
        }
    }

    addIdeaList(idea) {
        this._ideas.push(idea);
        // console.log(this._ideas)
        this.render();
    }
    getTagClass(tag) {
        tag = tag.toLowerCase();
        let tagClass = '';
        if (this._validTags.has(tag)) {
            tagClass = `tag-${tag}`
        } else {
            tagClass = ''
        }
        // console.log(tagClass);
        return tagClass;
    }

    render() {
        // console.log(this._ideas)
        this._IdeaListEl.innerHTML = this._ideas.map((idea) => {
            const tagClass = this.getTagClass(idea.tag);
            const deleteBtn = idea.username === localStorage.getItem('username') ?
                `<button class="delete"><i
                class="fas fa-times"></i></button>` :
                ``;
            return `
        <div class="card" data-id="${idea._id}">
        ${deleteBtn}
          ${idea.text}
        </h3>
        <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
        <p>
          posted on <span class="date">${idea.date}</span> by
          <span class="author">${idea.username}</span>
        </p>
      </div>
            `
        }).join('')
        this.addEventListener();
    }
}

export default IdeaList;
