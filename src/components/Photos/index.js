import React, { Component } from 'react';
import Img from 'gatsby-image';

import ExtLink from '../ExtLink';
import IconButton from '../IconButton';

import BackIcon from '../../icons/back.svg';
import NextIcon from '../../icons/next.svg';
import photosStyles from './photos.module.sass';

class Photos extends Component {
    state = { index: 0 };

    setIndex = (i) => this.setState({ index: i });
    next = () => this.setState(state => ({ index: state.index + 1 }));
    previous = () => this.setState(state => ({ index: state.index - 1 }));

    render() {
        const { images = [] } = this.props;
        const { index } = this.state;
        return (
            <div className={photosStyles.container}>
                <div
                    className={photosStyles.horizontalScroll}
                    style={{
                        width: `${images.length * 100}%`,
                        transform: `translateX(${(-index/images.length) * 100}%)`
                    }}
                >
                    {images.map(image =>
                        <ExtLink
                            href={image.url}
                            key={image.url}
                            style={{width: `${(index+1/images.length) * 100}%`}}
                        >
                            <Img fluid={image.fluid} />
                        </ExtLink>
                    )}
                </div>
                <div className={photosStyles.buttons}>
                    <IconButton
                        onClick={() => this.previous()}
                        description="see previous photo"
                        disabled={index === 0}
                        >
                        <BackIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => this.next()}
                        description="see next photo"
                        disabled={index === images.length - 1}
                    >
                        <NextIcon />
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default Photos;
