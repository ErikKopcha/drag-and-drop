class DragAndDrop {
    constructor(props = {
        elements: {
            dragItemsClass: '',
            rows: ''
        }
    }) {
        this.dragItem = null;
        this.dragItemsClass = props?.elements?.dragItemsClass;
        this.rows = props?.elements?.rows;
        
        if (!this.dragItemsClass) return console.error('drag items class is not defined');
        if (!this.rows) return console.error('rows class is not defined');
    }

    init() {
        this.getControlElements()
    }

    getControlElements() {
        this.dragItems = document.querySelectorAll(this.dragItemsClass);
        this.rows = document.querySelectorAll(this.rows);

        this.triggers();
    }

    triggers() {
        this.dragItems.forEach(item => {
            item.setAttribute('draggable', true);

            item.addEventListener('dragstart', (e) => {
                this.dragstart(e, item);
            });

            item.addEventListener('dragend', this.dragend);
        });

        this.rows.forEach(row => {
            row.addEventListener('dragover', this.dragover);
            row.addEventListener('dragenter', (e) => {
                this.dragenter(e);
            });
            row.addEventListener('dragleave', this.dragleave);

            row.addEventListener('drop', (e) => {
                this.drop(e);
            });
        });
    }

    dragstart(e, item) {
        this.dragItem = item;

        e.target.classList.add('dragged');
        e.target.classList.add('opacity-f');
    }

    dragend(e) {
        e.target.classList.remove('dragged');
        e.target.classList.remove('opacity-f');
    }

    dragover(e) {
        e.preventDefault();
    }

    dragenter(e) {
        this.dragItem.classList.add('opacity-f')
        try { e.target.appendChild(this.dragItem); } catch (e) { }
    }

    dragleave(e) {}

    drop(e) {
        try { e.target.appendChild(this.dragItem); } catch (e) { }
        e.target.classList.remove('opacity-f');
    }
}