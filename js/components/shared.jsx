define([
	// './auth', './config',
	'react', 'jquery', 'moment'], 
function(
	// Auth, Config,
	React, $, moment) {

	var result = {};


	var FeedItem = React.createClass({
		// componentDidMount() {
		//       var desc = $(React.findDOMNode(this)).find('.description');
		//       // console.log(desc.text());
		//       desc.dotdotdot();
		// },


		render: function() {
			var that = this;
			var data = that.props.data;
			if (!data) return null;


			// first limit number of words, then number of characters
			var description = data.description;
			if (
				data.description.length > 200
				|| data.description.split(" ").length > 50
				) {
				description = data.description.split(" ").slice(0, 50).join(" ").slice(0, 200) 
					+ "..."; // TODO maybe Read More
			}


			return (
				<div className="feed_item">
					{/* user and meta */}
					<div style={{backgroundColor: 'lightgrey', padding: '5px', margin: '5px 0'}}>
						<strong>{data.user.username}</strong> { moment(data.updatedAt).calendar().toLowerCase() }
					</div>

					{/* reading summary */}
					<div className="reading_summary" style={{display:'inline-block', margin: '0'}}>
						<div className="overflow_container">
							<strong>{data.reading.title}</strong>
							<object data={data.reading.image_url} type="image/png">
								<img src="img/logo_grey.png" />
							</object>
						</div>
					</div>

					<div className="" style={{width: '65%', display:'inline-block', verticalAlign: 'top', marginLeft:'10px', fontSize: '1.25em'}}>
						{/* actual post */}
						<div className="description">
							{ description }
						</div>
					</div>



				</div>
			)
		}

	});
	// result.FeedItem = FeedItem;


	result.PostViewer = React.createClass({
		render: function() {
			var that = this;
			var data = that.props.data;

			if (!data || !data.length) return <div>"No posts to show"</div>;

			return (
				<div>
					{
						data.map(function(v, i) {
							return <FeedItem data={v} key={i} />;
						})
					}
				</div>
			)
		}

	});


	result.Autocomplete = React.createClass({

		shouldComponentUpdate: function(nextProps) {
		  return this.props.data !== nextProps.data;
		},

		componentDidMount: function() {
		  this.updateAutocomplete();
		},

		componentWillUnmount: function() {
		  $(React.findDOMNode(this)).autocomplete('destroy');
		},

		componentDidUpdate: function() {
		  this.updateAutocomplete();
		},

		updateAutocomplete: function() {
		  var that = this;

		  var data = that.props.data;
		  var selectCallback = that.props.selectCallback;
		  var sourceCallback = that.props.sourceCallback;

		  if (!data) data = [];


		  $(React.findDOMNode(this)).autocomplete({
		  	source: sourceCallback,
		  	select: function(e, ui) {
		  		if (selectCallback) selectCallback(e, ui);
		  	}
		  });
		},

		render: function() {
			var that = this;


			return (
				<input type="text" placeholder={that.props.placeholder} name={that.props.name} className="form-control box" />
			)
		}
	});


	// parent should be relative
	// handler takes (data, event)
	result.Cancel = React.createClass({
		render: function() {
			var that = this;

			var styler = {
				position: 'absolute',
				top: '2px',
				right: '2px',
				cursor: 'pointer'
			};

			return (
				<span onClick={that.props.handler.bind(null, that.props.data)} style={styler} className="fa fa-times">
				</span>
			)
		}
	});



	return result;

});