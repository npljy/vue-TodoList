import '../assets/styles/footer.styl'
export default {
    data(){
        return {
            author:"NiePeng"
        }
    },
    render(){
        return (
            <footer class="footer">
                <span>Written By {this.author}</span>
            </footer>
        )
    }
}