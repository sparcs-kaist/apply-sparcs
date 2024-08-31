import * as ChannelService from '@channel.io/channel-web-sdk-loader';

export default () => {
  ChannelService.loadScript();
  ChannelService.boot({
    pluginKey: process.env.CHANNEL_PLUGIN_KEY,
  });
};
