use ExtUtils::MakeMaker;
use YAML;

my $config  = YAML::LoadFile((glob('./plugins/*/config.yaml'))[0]);
my $version = $config->{version};

use Getopt::Long 'GetOptions';
GetOptions('version=s' => \$version);

WriteMakefile(
    NAME     => $config->{name},
    VERSION  => $version,
    SKIP     => [qw(distdir)],
    DISTNAME => $config->{name},
);

sub MY::top_targets {
    << 'Makefile';
npm-install:
	npm ci

npm-build:
	npm run build

build-js: npm-install npm-build

build-locales:
	mkdir -p mt-static/plugins/$(NAME)/locales
	for f in plugins/$(NAME)/lib/MT/Plugin/$(NAME)/L10N/*.pm; do \
        l=$$(basename $$f .pm); \
        d=mt-static/plugins/$(NAME)/locales/$${l}.js; \
        \
        echo '(function() { var lexicon =' > $$d; \
        perl -Iplugins/$(NAME)/lib -MJSON -e "BEGIN { package MT::Plugin::L10N { sub new {} } }; use MT::Plugin::$(NAME)::L10N::$$l; print(encode_json(\%MT::Plugin::$(NAME)::L10N::$$l::Lexicon))" >> $$d || exit 1; \
        echo '; for (k in lexicon) { window.Lexicon[k] = lexicon[k] } })()' >> $$d; \
    done

build: build-js build-locales

create_distdir :
	$(RM_RF) $(DISTVNAME)
	$(PERLRUN) "-MExtUtils::Manifest=manicopy,maniread" \
		-e "manicopy(maniread(),'$(DISTVNAME)', '$(DIST_CP)');"
	perl -MYAML -e 'my $$f = "$(DISTVNAME)/plugins/$(NAME)/config.yaml"; my $$c = YAML::LoadFile($$f); if ($$c->{version} ne "$(VERSION)") { $$c->{version} = "$(VERSION)"; YAML::DumpFile($$f, $$c) }'

distdir : create_distdir build
	$(NOECHO) $(NOOP)

manifest : build

Makefile
}
