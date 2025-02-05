// @flow
import React, { Component } from 'react';
import SvgInline from 'react-svg-inline';
import { ipcRenderer } from 'electron';
import { defineMessages, intlShape, FormattedHTMLMessage } from 'react-intl';
import { environmentSpecificMessages } from '../../i18n/global-messages';
import styles from './About.scss';
import daedalusIcon from '../../assets/images/daedalus-logo-loading-grey.inline.svg';
import cardanoIcon from '../../assets/images/cardano-logo.inline.svg';
import mantisIcon from '../../assets/images/mantis-logo.inline.svg';
import environment from '../../environment';

const messages = defineMessages({
  aboutWindowTitle: {
    id: 'window.about.title',
    defaultMessage: '!!!About KAMI Wallet',
    description: 'About Window "title"',
  },
  aboutTitle: {
    id: 'static.about.title',
    defaultMessage: '!!!KAMI Wallet',
    description: 'About "title"',
  },
  aboutReleaseVersion: {
    id: 'static.about.release.version',
    defaultMessage: '!!!0.8.2',
    description: 'Label for "App Release Version"',
  },
  aboutContentDaedalusHeadline: {
    id: 'static.about.content.daedalus.headline',
    defaultMessage: '!!!KAMI Wallet Team:',
    description: 'About page KAMI Wallet team headline',
  },
  aboutContentCardanoHeadline: {
    id: 'static.about.content.cardano.headline',
    defaultMessage: '!!!KAMI Team:',
    description: 'About page KAMI team headline',
  },
  aboutContentMantisHeadline: {
    id: 'static.about.content.mantis.headline',
    defaultMessage: '!!!Mantis Team:',
    description: 'About page mantis team headline',
  },
  aboutContentDaedalusMembers: {
    id: 'static.about.content.daedalus.members',
    defaultMessage: '!!!Alexander Rukin, Charles Hoskinson, Darko Mijić, Dominik Guzei, Jeremy Wood, Nikola Glumac, Richard Wild, Tomislav Horaček, Stefan Malzner',
    description: 'About page KAMI Wallet team members',
  },
  aboutContentCardanoMembers: {
    id: 'static.about.content.cardano.members',
    defaultMessage: '!!!Alexander Sukhoverkhov, Alexander Vieth, Alexandre Rodrigues Baldé, Alfredo Di Napoli, Anastasiya Besman, Andrzej Rybczak, Ante Kegalj, Anton Belyy, Anupam Jain, Arseniy Seroka, Artyom Kazak, Carlos D\'Agostino, Charles Hoskinson, Dan Friedman, Denis Shevchenko, Dmitry Kovanikov, Dmitry Mukhutdinov, Dmitry Nikulin, Domen Kožar, Duncan Coutts, Edsko de Vries, Eileen Fitzgerald, George Agapov, Hiroto Shioi, Ilya Lubimov, Ilya Peresadin, Ivan Gromakovskii, Jake Mitchell, Jane Wild, Jens Krause, Jeremy Wood, Joel Mislov Kunst, Jonn Mostovoy, Konstantin Ivanov, Kristijan Šarić, Lars Brünjes, Laurie Wang, Lionel Miller, Michael Bishop, Mikhail Volkhov, Niklas Hambüchen, Peter Gaži, Philipp Kant, Serge Kosyrev, Vincent Hanquez',
    description: 'About page KAMI team members',
  },
  aboutContentMantisMembers: {
    id: 'static.about.content.mantis.members',
    defaultMessage: '!!!Adam Smolarek, Alan McSherry, Alan Verbner, Alejandro Garcia, Charles Hoskinson, Domen Kožar, Eileen Fitzgerald, Hiroto Shioi, Jane Wild, Jan Ziniewicz, Javier Diaz, Jeremy Wood, Laurie Wang, Łukasz Gąsior, Konrad Staniec, Michael Bishop, Mirko Alić, Nicolás Tallar, Radek Tkaczyk, Serge Kosyrev',
    description: 'About page mantis team members',
  },
  aboutCopyright: {
    id: 'static.about.copyright',
    defaultMessage: '!!!Input Output HK Limited. Licensed under',
    description: 'About "copyright"',
  },
  licenseLink: {
    id: 'static.about.license',
    defaultMessage: '!!!MIT licence',
    description: 'About page license name',
  },
  aboutBuildInfo: {
    id: 'static.about.buildInfo',
    defaultMessage: '!!!MacOS build 3769, with KAMI 1.0.4',
    description: 'About page build information',
  },
});

export default class About extends Component<any> {

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  componentWillMount() {
    ipcRenderer.send('about-window-title', this.context.intl.formatMessage(messages.aboutWindowTitle));
  }

  render() {
    const { intl } = this.context;

    let platform;
    switch (environment.platform) {
      case 'darwin':
        platform = 'macOS';
        break;
      case 'win32':
        platform = 'Windows';
        break;
      case 'linux':
        platform = 'Linux';
        break;
      default:
        platform = '';
    }

    const build = environment.build;
    const apiName = intl.formatMessage(environmentSpecificMessages[environment.API].apiName);
    const apiVersion = intl.formatMessage(environmentSpecificMessages[environment.API].apiVersion);
    const apiIcon = environment.isAdaApi() ? cardanoIcon : mantisIcon;

    const apiHeadline = environment.isAdaApi()
      ? intl.formatMessage(messages.aboutContentCardanoHeadline)
      : intl.formatMessage(messages.aboutContentMantisHeadline);

    const apiMembers = environment.isAdaApi()
      ? intl.formatMessage(messages.aboutContentCardanoMembers)
      : intl.formatMessage(messages.aboutContentMantisMembers);

    return (
      <div className={styles.container}>

        <div className={styles.headerWrapper}>

          <SvgInline svg={daedalusIcon} className={styles.daedalusIcon} />

          <div className={styles.daedalusTitleVersion}>
            <div className={styles.daedalusTitle}>
              {intl.formatMessage(messages.aboutTitle)}
              <span className={styles.daedalusVersion}>
                {intl.formatMessage(messages.aboutReleaseVersion)}
              </span>
            </div>
            <div className={styles.daedalusBuildInfo}>
              <FormattedHTMLMessage
                {...messages.aboutBuildInfo}
                values={{ platform, build, apiName, apiVersion }}
              />
            </div>
          </div>

          <SvgInline svg={apiIcon} className={styles.apiIcon} />
        </div>

        <div className={styles.contentText}>

          <h2>{intl.formatMessage(messages.aboutContentDaedalusHeadline)}</h2>

          <div className={styles.contentDaedalus}>
            {intl.formatMessage(messages.aboutContentDaedalusMembers)}
          </div>

          <h2>{apiHeadline}</h2>

          <div className={styles.apiMembers}>
            {apiMembers}
          </div>

        </div>

        <div className={styles.footerWrapper}>
          <a href="http://KAMIwallet.io">http://KAMIwallet.io</a>
          <div className={styles.copyright}>
            {intl.formatMessage(messages.aboutCopyright)}&nbsp;
            <a href="https://github.com/input-output-hk/daedalus/blob/master/LICENSE">
              {intl.formatMessage(messages.licenseLink)}
            </a>
          </div>
        </div>

      </div>
    );
  }
}
